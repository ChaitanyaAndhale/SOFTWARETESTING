package com.vsquarters.service;

import com.vsquarters.model.Project;
import com.vsquarters.model.TestRun;
import com.vsquarters.repository.ProjectRepository;
import com.vsquarters.repository.TestRunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CompletableFuture;

@Service
public class TestRunService {

    @Autowired
    private TestRunRepository testRunRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private DockerService dockerService;

    public TestRun startTestRun(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        TestRun testRun = new TestRun();
        testRun.setProject(project);
        testRun.setStatus("RUNNING");
        testRun.setStartTime(LocalDateTime.now());

        TestRun savedTestRun = testRunRepository.save(testRun);

        // Run asynchronously
        CompletableFuture.runAsync(() -> executeTestLogic(savedTestRun));

        return savedTestRun;
    }

    @Autowired
    private AiService aiService;

    private void executeTestLogic(TestRun testRun) {
        try {
            // AI PLAN Phase
            List<String> plan = aiService.analyzeProjectAndPlan(testRun.getProject());
            String planLog = String.join("\nINFO: ", plan);

            // 1. Prepare Environment (Docker)
            // String containerId = dockerService.createAndStartContainer("openjdk", "17");

            // 2. Run Tests (Simulated)
            Thread.sleep(3000);

            // 3. AI EVALUATE & IMPROVE Phase
            int score = new Random().nextInt(40) + 60; // Random score 60-100
            String logs = "INFO: Plan Executed:\n" + planLog +
                    "\nINFO: Starting Application...\nINFO: Running Unit Tests...\nSUCCESS: UserTest passed.\n" +
                    "WARN: Database connection slow.";

            String evaluation = aiService.evaluateResults(logs, score);
            List<String> improvements = aiService.suggestImprovements();

            String finalReport = String.format("{\"score\": %d, \"evaluation\": \"%s\", \"improvements\": %s}",
                    score, evaluation, improvements.toString().replace("\"", "'"));

            testRun.setStatus("COMPLETED");
            testRun.setEndTime(LocalDateTime.now());
            testRun.setQualityScore(score);
            testRun.setLogs(logs);
            testRun.setReport(finalReport);

            testRunRepository.save(testRun);

        } catch (Exception e) {
            testRun.setStatus("FAILED");
            testRun.setLogs("ERROR: " + e.getMessage());
            testRun.setEndTime(LocalDateTime.now());
            testRunRepository.save(testRun);
        }
    }
}
