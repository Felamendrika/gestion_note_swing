/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.client.models;

/**
 *
 * @author senketsu
 */
public class Note {
    private String ne; 
    private String codemat;
    private double note;
    
    public Note(String ne, String codemat, double note) {
        this.ne = ne;
        this.codemat  = codemat;
        this.note = note;
    }
    
    // Getters et Setters
    public String getNe() { return ne; }
    public void setNe(String ne) { this.ne = ne; }
    
    public String getCodemat() { return codemat; }
    public void setCodemat(String codemat) { this.codemat = codemat; }
    
    public double getNote() { return note; }
    public void setNote(double note) { this.note = note; }
    
    @Override 
    public String toString() {
        return ne + " - " + codemat + " : " + note;
    }
}
