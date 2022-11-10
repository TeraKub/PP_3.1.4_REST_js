package com.maxchuma.pp_3_1_4.exception_handing;

public class NoSuchUserException extends RuntimeException{

    public NoSuchUserException(String message) {
        super(message);
    }
}
