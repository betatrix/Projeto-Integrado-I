package com.vocco.api.infra.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FilesTestService {
    @Value("${aws.s3.bucketImagensTeste}")
    private String bucketImagensTeste;
    private  final AmazonS3 s3;

    public FilesTestService(AmazonS3 s3) {
        this.s3 = s3;
    }

    public Resource buscarArquivo(String filename) {
        S3Object object = s3.getObject(bucketImagensTeste, filename);
        S3ObjectInputStream objectContent = object.getObjectContent();
        return new InputStreamResource(objectContent);
    }

    public String excluirArquivo(String filename) {
        s3.deleteObject(bucketImagensTeste,filename);
        return "Arquivo excluído.";
    }

    public List<String> listarArquivos() {
        ListObjectsV2Result listObjectsV2Result = s3.listObjectsV2(bucketImagensTeste);
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
