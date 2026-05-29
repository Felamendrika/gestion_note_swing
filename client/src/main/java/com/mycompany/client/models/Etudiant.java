/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.client.models;

/**
 *
 * @author senketsu
 */
public class Etudiant {
    private String ne;
    private String nom;
    private String niveau;
    
    // Constructeur
    public Etudiant(String ne, String nom, String niveau) {
        this.ne = ne;
        this.nom = nom;
        this.niveau = niveau;
    }
    
    // Getters et Setters 
    public String getNe() { return ne; }
    public void setNe(String ne) { this.ne = ne; }
    
    public String getNom() { return nom; }
    public void SetNom(String nom) { this.nom = nom; }
    
    public String getNiveau() { return niveau; }
    public void setNiveau(String niveau) { this.niveau = niveau; }
    
    @Override
    public String toString() {
        return ne + " - " + nom + " (" + niveau + ")";
    }
}
