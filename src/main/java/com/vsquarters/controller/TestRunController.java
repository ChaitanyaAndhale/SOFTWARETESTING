package com.vsquarters.controller;

import com.vsquarters.model.TestRun;
import com.vsquarters.service.TestRunService;
import com.vsquarters.repository.TestRunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
public class TestRunController {

    @Autowired
    private TestRunService testRunService;

    @Autowired
    private TestRunRepository testRunRepository;

    @PostMapping("/run/{projectId}")
    public ResponseEntity<?> runTest(@PathVariable Long projectId) {
        try {
            TestRun testRun = testRunService.startTestRun(projectId);
            return ResponseEntity.ok(testRun);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/project/{projectId}")
    public List<TestRun> getTestRunsByProject(@PathVariable Long projectId) {
        return testRunRepository.findByProjectId(projectId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTestRunById(@PathVariable Long id) {
        return testRunRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
