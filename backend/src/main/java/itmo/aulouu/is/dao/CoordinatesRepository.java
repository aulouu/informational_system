package itmo.aulouu.is.dao;

import itmo.aulouu.is.model.Coordinates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordinatesRepository extends JpaRepository<Coordinates, Long> {
    boolean existsByXAndY(int x, int y);

    Coordinates findByXAndY(int x, int y);
}
