package com.vsquarters.controller;

import com.vsquarters.model.Project;
import com.vsquarters.model.User;
import com.vsquarters.repository.ProjectRepository;
import com.vsquarters.repository.UserRepository;
import com.vsquarters.service.FileStorageService;
import com.vsquarters.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadProject(@RequestParam("file") MultipartFile file,
                                           @RequestParam("name") String name,
                                           @RequestParam("description") String description,
                                           Principal principal) {
        
        String fileName = fileStorageService.storeFile(file);

        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        project.setFileName(fileName);
        project.setUser(user);

        Project savedProject = projectRepository.save(project);

        return ResponseEntity.ok(savedProject);
    }

    @GetMapping
    public List<Project> getAllProjects(Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
             .orElseThrow(() -> new RuntimeException("User not found"));
        return projectRepository.findByUserId(user.getId());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id, Principal principal) {
         Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
         // Verify ownership
         if (!project.getUser().getUsername().equals(principal.getName())) {
             return ResponseEntity.status(403).body("Access denied");
         }
         return ResponseEntity.ok(project);
    }
}
