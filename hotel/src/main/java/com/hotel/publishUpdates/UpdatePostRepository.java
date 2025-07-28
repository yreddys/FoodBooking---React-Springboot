package com.hotel.publishUpdates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpdatePostRepository extends JpaRepository<UpdatePost, Long> {
}
