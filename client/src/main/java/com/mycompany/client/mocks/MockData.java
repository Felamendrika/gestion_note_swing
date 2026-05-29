/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.client.mocks;

import com.mycompany.client.models.Etudiant;
import com.mycompany.client.models.Matiere;
import com.mycompany.client.models.Note;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author senketsu
 */
public class MockData {
        // Listes STATIQUES (une seule instance pour toute l'application)
    private static List<Etudiant> etudiants;
    private static List<Matiere> matieres;
    private static List<Note> notes;
    
    // Initialisation des données
    static {
        // Étudiants
        etudiants = new ArrayList<>();
        etudiants.add(new Etudiant("E001", "Rivo", "L3"));
        etudiants.add(new Etudiant("E002", "Andry", "L2"));
        etudiants.add(new Etudiant("E003", "Miary", "M1"));
        etudiants.add(new Etudiant("E004", "Jean", "L3"));
        etudiants.add(new Etudiant("E005", "Sara", "L1"));
        
        // Matières
        matieres = new ArrayList<>();
        matieres.add(new Matiere("MATH01", "Mathématiques", 3));
        matieres.add(new Matiere("PHY02", "Physique", 2));
        matieres.add(new Matiere("INFO03", "Informatique", 4));
        matieres.add(new Matiere("ANG04", "Anglais", 1));
        
        // Notes
        notes = new ArrayList<>();
        notes.add(new Note("E001", "PHY02", 12.0));
        notes.add(new Note("E001", "INFO03", 16.0));
        notes.add(new Note("E001", "ANG04", 10.0));
        notes.add(new Note("E002", "MATH01", 8.5));
        notes.add(new Note("E002", "PHY02", 9.0));
        notes.add(new Note("E002", "INFO03", 7.0));
        notes.add(new Note("E002", "ANG04", 11.0));
        notes.add(new Note("E003", "MATH01", 18.0));
        notes.add(new Note("E003", "PHY02", 17.5));
        notes.add(new Note("E003", "INFO03", 19.0));
        notes.add(new Note("E003", "ANG04", 14.0));
        notes.add(new Note("E004", "MATH01", 10.0));
        notes.add(new Note("E004", "PHY02", 10.0));
        notes.add(new Note("E004", "INFO03", 9.5));
        notes.add(new Note("E004", "ANG04", 12.0));
        notes.add(new Note("E005", "MATH01", 11.0));
        notes.add(new Note("E005", "PHY02", 10.5));
        notes.add(new Note("E005", "INFO03", 12.0));
        notes.add(new Note("E005", "ANG04", 8.0));
    }
    
    public static List<Etudiant> getEtudiants() {
        return etudiants;
    }
    
    public static List<Matiere> getMatieres() {
        return matieres;
    }
    
    public static List<Note> getNotes() {
        return notes;
    }
}
