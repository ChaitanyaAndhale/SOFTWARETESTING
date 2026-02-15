package com.vsquarters.repository;

import com.vsquarters.model.TestRun;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestRunRepository extends JpaRepository<TestRun, Long> {
    List<TestRun> findByProjectId(Long projectId);
}
