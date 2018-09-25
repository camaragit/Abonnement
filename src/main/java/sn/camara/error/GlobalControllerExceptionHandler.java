package sn.camara.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.FrameworkServlet;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.ServletException;
import javax.validation.ConstraintViolationException;

/**
 *
 * @author magiccrafter
 */
@RestControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler(value = { ConstraintViolationException.class })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse constraintViolationException(ConstraintViolationException ex) {
        return new ApiErrorResponse(500, 5001, ex.getMessage());
    }
    @ExceptionHandler(value = { CustomException.class })
   // @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse monexeception(CustomException ex) {
        return new ApiErrorResponse(500, 5001, ex.getMessage());
    }
    @ExceptionHandler(value = { Exception.class })
    // @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse monexeception(Exception ex) {
        return new ApiErrorResponse(500, 5001,"Une belle erreur mon cher");
    }

    @ExceptionHandler(value = { NoHandlerFoundException.class })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrorResponse noHandlerFoundException(NoHandlerFoundException ex) {
        System.out.println("Dame===>"+ex.getMessage());
        return new ApiErrorResponse(404, 4041, "End point non reconnu");
    }

/*
    @ExceptionHandler(value = { Exception.class })
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiErrorResponse unknownException(Exception ex) {
        return new ApiErrorResponse(500, 5002, ex.getMessage());
    }
*/


}
