package itmo.aulouu.is.dto.coordinates;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AlterCoordinatesDTO {

    private int x;

    @Min(-290)
    private int y;

    @NotNull
    private Boolean adminCanModify;
}