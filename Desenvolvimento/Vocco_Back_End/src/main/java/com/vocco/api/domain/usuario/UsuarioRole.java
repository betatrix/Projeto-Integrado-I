package com.vocco.api.domain.usuario;

public enum UsuarioRole {
    ADMIN("admin"),
    ESTUDANTE("estudante");

    private String role;
    UsuarioRole(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }

}
