package com.vsquarters.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "test_runs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestRun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status; // PENDING, RUNNING, COMPLETED, FAILED
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    
    private int qualityScore;
    
    @Column(columnDefinition = "TEXT")
    private String logs;
    
    @Column(columnDefinition = "TEXT")
    private String report; // JSON or link to PDF

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    @PrePersist
    protected void onCreate() {
        startTime = LocalDateTime.now();
        status = "PENDING";
    }
}
