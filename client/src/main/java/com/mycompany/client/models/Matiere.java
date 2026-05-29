/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.client.models;

/**
 *
 * @author senketsu
 */
public class Matiere {
    private String codemat;
    private String libelle;
    private int coef;
    
    public Matiere(String codemat, String libelle, int coef) {
        this.codemat = codemat;
        this.libelle = libelle;
        this.coef = coef;
    }
    
    // Getters et Setters
    public String getCodemat() { return codemat; }
    public void setCodemat(String codemat) {this.codemat = codemat; }
    
    public String getLibelle() {return libelle; }
    public void setLibelle(String libelle) { this.libelle = libelle; }
    
    public int getCoef() { return coef; }
    public void setCoef(int coef) { this.coef = coef;}
    
    @Override
    public String toString() {
        return codemat + " - " + libelle + " (coef : " + coef + ")";
    }
    
}
