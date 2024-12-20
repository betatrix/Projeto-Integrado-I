package com.vocco.api.infra.aws;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {

    @Value("${aws.s3.accessKey}")
    private String accessKey;

    @Value("${aws.s3.secret}")
    private String secret;

    @Value("${aws.s3.region}")
    private String region;

    @Value("${aws.s3.bucketProfile}")
    private String bucketProfileUser;

    @Value("${aws.s3.bucketImagensTeste}")
    private String bucketImagesTest;

    @Bean
    public AmazonS3 users(){
        AWSCredentials awsCredentials=new BasicAWSCredentials(accessKey,secret);
        return AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }



}

