package com.vsquarters.service;

import com.vsquarters.model.Project;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class AiService {

    // Plan Phase
    public List<String> analyzeProjectAndPlan(Project project) {
        List<String> plan = new ArrayList<>();
        plan.add("Analyzing metadata for project: " + project.getName());

        // Mock analysis based on keywords in description
        if (project.getDescription().toLowerCase().contains("api")) {
            plan.add("Detected API capabilities. Recommending Integration Tests.");
        }
        if (project.getDescription().toLowerCase().contains("money")
                || project.getDescription().toLowerCase().contains("secure")) {
            plan.add("Detected sensitive data. Recommending Security Scans.");
        }

        plan.add("Risk Assessment: Moderate. Complex logic detected in core modules.");
        return plan;
    }

    // Execute Phase (Decision making)
    public List<String> recommendTestCases(Project project) {
        List<String> tests = new ArrayList<>();
        tests.add("Unit Tests (JUnit)");
        tests.add("Static Code Analysis (SonarQube)");

        // Dynamic selection
        if (new Random().nextBoolean()) {
            tests.add("Load Testing (JMeter)");
        }
        return tests;
    }

    // Evaluate Phase
    public String evaluateResults(String logs, int score) {
        if (score < 80) {
            return "Quality Score is low (" + score + "). Major refactoring recommended.";
        }
        if (logs.contains("Exception")) {
            return "Stability issues detected in logs. Check exception handling.";
        }
        return "System looks stable. Good job!";
    }

    // Improve Phase
    public List<String> suggestImprovements() {
        List<String> suggestions = new ArrayList<>();
        suggestions.add("Optimize database queries in User repository.");
        suggestions.add("Add caching for frequently accessed API endpoints.");
        suggestions.add("Upgrade dependency: spring-boot to 3.2.3 for security patches.");
        return suggestions;
    }
}
