package com.vocco.api.infra.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.vocco.api.domain.usuario.Usuario;
import com.vocco.api.domain.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FilesProfileService {

    @Value("${aws.s3.bucketProfile}")
    private String bucketFotosDePerfil;
    private  final AmazonS3 s3;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public FilesProfileService(AmazonS3 s3) {
        this.s3 = s3;
    }

    public String salvarFotoDePerfil(MultipartFile arquivo, Long id) {
        String nomeOriginal = arquivo.getOriginalFilename();
        if (nomeOriginal == null || !nomeOriginal.matches(".*\\.(jpg|jpeg|png)$")) {
            throw new IllegalArgumentException("Tipo de arquivo inválido. Apenas jpg, jpeg e png são permitidos.");
        }

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        if (usuario.getFotoDePerfil() != null) {
            String nomeFotoAntiga = usuario.getFotoDePerfil();
            s3.deleteObject(bucketFotosDePerfil, nomeFotoAntiga);
        }

        String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
        String novoNome = UUID.randomUUID() + extensao;

        int tentativas = 0;
        int maximoTentativas = 3;

        while (true) {
            try {
                File arquivoConvertido = converterArquivo(arquivo);
                s3.putObject(bucketFotosDePerfil, novoNome, arquivoConvertido);
                return novoNome;
            } catch (IOException e) {
                if (++tentativas == maximoTentativas) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    public Resource buscarArquivo(String filename) {
        S3Object object = s3.getObject(bucketFotosDePerfil, filename);
        S3ObjectInputStream objectContent = object.getObjectContent();
        return new InputStreamResource(objectContent);
    }

    public String excluirArquivo(String filename) {
        s3.deleteObject(bucketFotosDePerfil,filename);
        return "Arquivo excluído.";
    }

    public List<String> listarArquivos() {
        ListObjectsV2Result listObjectsV2Result = s3.listObjectsV2(bucketFotosDePerfil);
        return  listObjectsV2Result.getObjectSummaries().stream().map(S3ObjectSummary::getKey).collect(Collectors.toList());

    }

    private File converterArquivo(MultipartFile file ) throws IOException
    {
        File convFile = new File( file.getOriginalFilename() );
        FileOutputStream fos = new FileOutputStream( convFile );
        fos.write( file.getBytes() );
        fos.close();
        return convFile;
    }
}

