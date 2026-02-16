package com.vsquarters.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.model.ExposedPort;
import com.github.dockerjava.api.model.HostConfig;
import com.github.dockerjava.api.model.PortBinding;
import com.github.dockerjava.api.model.Ports;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientImpl;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class DockerService {

    private DockerClient dockerClient;

    public DockerService() {
        // Initialize Docker Client
        DefaultDockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder().build();
        DockerHttpClient httpClient = new ApacheDockerHttpClient.Builder()
                .dockerHost(config.getDockerHost())
                .sslConfig(config.getSSLConfig())
                .maxConnections(100)
                .connectionTimeout(Duration.ofSeconds(30))
                .responseTimeout(Duration.ofSeconds(45))
                .build();

        this.dockerClient = DockerClientImpl.getInstance(config, httpClient);
    }

    public String createAndStartContainer(String imageName, String tagName) {
        // For demonstration, pulling a simple image usually. 
        // In real execution, we would build an image from the uploaded software.
        
        // Pull image (blocking for simplicity in this prototype)
        // try {
        //     dockerClient.pullImageCmd(imageName).withTag(tagName).start().awaitCompletion();
        // } catch (InterruptedException e) {
        //     throw new RuntimeException("Failed to pull image", e);
        // }

        CreateContainerResponse container = dockerClient.createContainerCmd(imageName + ":" + tagName)
                .withExposedPorts(ExposedPort.tcp(8080))
                .withHostConfig(HostConfig.newHostConfig().withPortBindings(PortBinding.parse("0.0.0.0:8080:8080")))
                .exec();

        dockerClient.startContainerCmd(container.getId()).exec();

        return container.getId();
    }

    public void stopContainer(String containerId) {
        dockerClient.stopContainerCmd(containerId).exec();
        dockerClient.removeContainerCmd(containerId).exec();
    }
    
    // Placeholder for log retrieval
    public String getLogs(String containerId) {
        // In production, use logContainerCmd with a callback
        return "Logs from container " + containerId;
    }
}
