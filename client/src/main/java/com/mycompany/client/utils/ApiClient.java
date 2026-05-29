/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.client.utils;

import okhttp3. *;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.mycompany.client.models.Etudiant;
import com.mycompany.client.models.Matiere;
import com.mycompany.client.models.Note;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * ApiClient - Gère toutes les communications avec le backend Express
 * Utilise OkHttp pour les requêtes HTTP et Gson pour le JSON
 */
public class ApiClient {
    
    // URL de base du Backend 
    private static final String BASE_URL = "http://localhost:3000/api";
    
    // Client HTTP unique reutilisable
    private static final OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build();
    
    // Gson pour convertir JSON Object Java
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    
    // ================= Etudiants ====================
    
    /**
     * Recuprer tous les etudiants
     * GET /api/etudiants
     * @return 
     * @throws java.lang.Exception
     */
    public static List<Etudiant> getEtudiants() throws Exception {
        String url = BASE_URL + "/etudiants";
        Request request = new Request.Builder().url(url).get().build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur HTTP; " + response.code());
            }
            
            String json = response.body().string();
            System.out.println("Réponse API getEtudiants: " + json);
            
            JsonObject jsonResponse = gson.fromJson(json, JsonObject.class);
            JsonArray dataArray = jsonResponse.getAsJsonArray("data");
            
            Type listType = new TypeToken<List<Etudiant>>(){}.getType();
            return gson.fromJson(dataArray, listType);
        }
    }
    
    /**
     * REcuperer les etudiants filtres par niveau 
     * GET /api/etudiants?niveau=L3
     * @param niveau
     * @return 
     * @throws java.lang.Exception
     */
    public static List<Etudiant> getEtudiantsParNiveau(String niveau) throws Exception {
        String url = BASE_URL + "/etudiants?niveau=" + niveau;
        Request request = new Request.Builder().url(url).get().build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur HTTP: " + response.code());
            }
            
            String json = response.body().string();
            JsonObject jsonResponse = gson.fromJson(json, JsonObject.class);
            JsonArray dataArray = jsonResponse.getAsJsonArray("data");
            
            Type listType = new TypeToken<List<Etudiant>>(){}.getType();
            return gson.fromJson(dataArray, listType);
        }
    }
    
    /**
     * Recherche des etudiants par ;ot-cle
     * GET /api/etudiants?q=recherche
     * @param motCle
     * @return 
     * @throws java.lang.Exception
     */
    public static List<Etudiant> rechercheEtudiants(String motCle) throws Exception {
        String url = BASE_URL + "/etudiants?q=" + motCle;
        Request request = new Request.Builder().url(url).get().build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur HTTP: " + response.code());
            }
            
            String json = response.body().string();
            JsonObject jsonResponse = gson.fromJson(json, JsonObject.class);
            JsonArray dataArray = jsonResponse.getAsJsonArray("data");
            
            Type listType = new TypeToken<List<Etudiant>>(){}.getType();
            return gson.fromJson(dataArray, listType);
        }
    }
    
    /**
     * Ajouter un etudiant
     * POST /api/etudiants
     * @param etudiant
     * @return 
     * @throws java.lang.Exception
     */
    public static boolean ajouterEtudiant(Etudiant etudiant) throws Exception {
        String url = BASE_URL + "/etudiants";
        
        JsonObject body = new JsonObject();
        body.addProperty("ne", etudiant.getNe());
        body.addProperty("nom", etudiant.getNom());
        body.addProperty("niveau", etudiant.getNiveau());
        
        RequestBody requestBody = RequestBody.create(
                body.toString(),
                MediaType.parse("application/json")
        );
        
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .build();
        
        try (Response response = client.newCall(request).execute()) {
            return response.isSuccessful();
        }
    }
    
    /**
     * Modifier un etudiant
     * PUT /api/etudiant
     * @param ne
     * @param etudiant
     * @return 
     * @throws java.lang.Exception 
     */
    public static boolean modifierEtudiant(String ne, Etudiant etudiant) throws Exception {
        String url = BASE_URL + "/etudiants/" + ne;
        
        System.out.println("URL modification: " + url);
        System.out.println("Body: ne=" + ne + ", nom=" + etudiant.getNom() + ", niveau=" + etudiant.getNiveau());
        
        JsonObject body = new JsonObject();
        body.addProperty("nom",etudiant.getNom());
        body.addProperty("niveau", etudiant.getNiveau());
        
        RequestBody requestBody = RequestBody.create(
                body.toString(),
                MediaType.parse("application/json")
        );
        
        Request request = new Request.Builder()
                .url(url)
                .put(requestBody)
                .build();
        
        try (Response response = client.newCall(request).execute()) {
            String responseBody = response.body().string();
            System.out.println("Réponse modification: code=" + response.code() + ", body=" + responseBody);
            return response.isSuccessful();
        }
    }
    
    /**
     * Supprimer un etudiant
     * DELETE /api/etudiant/
     * @param ne
     * @return 
     * @throws java.lang.Exception
     */
    public static boolean supprimerEtudiant(String ne) throws Exception {
        String url = BASE_URL + "/etudiants/" + ne;
        
        Request request = new Request.Builder()
            .url(url)
            .delete()
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            return response.isSuccessful();
        }
    }
    
    // ============================== MATIERES ====================
    /**
     * Récupère toutes les matières
     * GET /api/matieres
     * @return 
     * @throws java.lang.Exception
     */
    public static List<Matiere> getMatieres() throws Exception {
        String url = BASE_URL + "/matieres";
        Request request = new Request.Builder().url(url).get().build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur HTTP: " + response.code());
            }
            
            String json = response.body().string();
            JsonObject jsonResponse = gson.fromJson(json, JsonObject.class);
            JsonArray dataArray = jsonResponse.getAsJsonArray("data");
            
            Type listType = new TypeToken<List<Matiere>>(){}.getType();
            return gson.fromJson(dataArray, listType);
        }
    }
    
    /**
     * Ajoute une matière
     * POST /api/matieres
     * @param matiere
     * @return 
     * @throws java.lang.Exception
     */
    public static boolean ajouterMatiere(Matiere matiere) throws Exception {
        String url = BASE_URL + "/matieres";
        
        JsonObject body = new JsonObject();
        body.addProperty("codemat", matiere.getCodemat());
        body.addProperty("libelle", matiere.getLibelle());
        body.addProperty("coef", matiere.getCoef());
        
        RequestBody requestBody = RequestBody.create(
            body.toString(),
            MediaType.parse("application/json")
        );
        
        Request request = new Request.Builder()
            .url(url)
            .post(requestBody)
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            return response.isSuccessful();
        }
    }
    
    /**
     * Modifie une matière
     * PUT /api/matieres/:codemat
     * @param codemat
     * @param matiere
     * @return 
     * @throws java.lang.Exception
     */
    public static boolean modifierMatiere(String codemat, Matiere matiere) throws Exception {
        String url = BASE_URL + "/matieres/" + codemat;
        
        JsonObject body = new JsonObject();
        body.addProperty("libelle", matiere.getLibelle());
        body.addProperty("coef", matiere.getCoef());
        
        RequestBody requestBody = RequestBody.create(
            body.toString(),
            MediaType.parse("application/json")
        );
        
        Request request = new Request.Builder()
            .url(url)
            .put(requestBody)
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            return response.isSuccessful();
        }
    }
    
    /**
     * Supprime une matière
     * DELETE /api/matieres/:codemat
     * @param codemat
     * @return 
     * @throws java.lang.Exception
     */
    public static boolean supprimerMatiere(String codemat) throws Exception {
        String url = BASE_URL + "/matieres/" + codemat;
        
        Request request = new Request.Builder()
            .url(url)
            .delete()
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            return response.isSuccessful();
        }
    }
    
    // ==================== NOTES ====================
        
    /**
     * Récupère toutes les notes
     * GET /api/notes
     * @return 
     * @throws java.lang.Exception
     */
    public static List<Note> getNotes() throws Exception {
        String url = BASE_URL + "/notes";
        Request request = new Request.Builder().url(url).get().build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur HTTP: " + response.code());
            }
            
            String json = response.body().string();
            JsonObject jsonResponse = gson.fromJson(json, JsonObject.class);
            JsonArray dataArray = jsonResponse.getAsJsonArray("data");
            
            Type listType = new TypeToken<List<Note>>(){}.getType();
            return gson.fromJson(dataArray, listType);
        }
    }
    
    /**
     * Ajoute une note
     * POST /api/notes
     * @param note
     * @return 
     * @throws java.lang.Exception
     */
    public static boolean ajouterNote(Note note) throws Exception {
        String url = BASE_URL + "/notes";
        
        System.out.println("Ajout note - URL: " + url);
        System.out.println("Ajout note - Body: ne=" + note.getNe() + ", codemat=" + note.getCodemat() + ", note=" + note.getNote());
        
        JsonObject body = new JsonObject();
        body.addProperty("ne", note.getNe());
        body.addProperty("codemat", note.getCodemat());
        body.addProperty("note", note.getNote());
        
        RequestBody requestBody = RequestBody.create(
            body.toString(),
            MediaType.parse("application/json")
        );
        
        Request request = new Request.Builder()
            .url(url)
            .post(requestBody)
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            String responseBody = response.body().string();
            System.out.println("📝 Réponse ajout note: code=" + response.code() + ", body=" + responseBody);
            return response.isSuccessful();
        }
    }
    
    /**
     * Modifie une note
     * PUT /api/notes/:ne/:codemat
     * @param ne
     * @param codemat
     * @param note
     * @return 
     * @throws java.lang.Exception
     */
    public static boolean modifierNote(String ne, String codemat, double note) throws Exception {
        String url = BASE_URL + "/notes/" + ne + "/" + codemat;
        
        JsonObject body = new JsonObject();
        body.addProperty("note", note);
        
        RequestBody requestBody = RequestBody.create(
            body.toString(),
            MediaType.parse("application/json")
        );
        
        Request request = new Request.Builder()
            .url(url)
            .put(requestBody)
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            return response.isSuccessful();
        }
    }
    
    /**
     * Supprime une note
     * DELETE /api/notes/:ne/:codemat
     * @param ne
     * @param codemat
     * @return 
     * @throws java.lang.Exception
     */
    public static boolean supprimerNote(String ne, String codemat) throws Exception {
        String url = BASE_URL + "/notes/" + ne + "/" + codemat;
        
        Request request = new Request.Builder()
            .url(url)
            .delete()
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            return response.isSuccessful();
        }
    }
    
    // ==================== BULLETIN ====================
    
    /**
     * Récupère le bulletin d'un étudiant
     * GET /api/bulletins/:ne
     * @param ne
     * @return 
     * @throws java.lang.Exception
     */
    public static JsonObject getBulletin(String ne) throws Exception {
        String url = BASE_URL + "/bulletins/" + ne;
        Request request = new Request.Builder().url(url).get().build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur HTTP: " + response.code());
            }
            
            String json = response.body().string();
            JsonObject jsonResponse = gson.fromJson(json, JsonObject.class);
            return jsonResponse.getAsJsonObject("data");
        }
    }
    
    // ==================== CLASSEMENT ====================
    
    /**
     * Récupère le classement par niveau
     * GET /api/classement/:niveau
     * @param niveau
     * @return 
     * @throws java.lang.Exception
     */
    public static JsonArray getClassement(String niveau) throws Exception {
        String url = BASE_URL + "/classement/" + niveau;
        Request request = new Request.Builder().url(url).get().build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Erreur HTTP: " + response.code());
            }
            
            String json = response.body().string();
            JsonObject jsonResponse = gson.fromJson(json, JsonObject.class);
            return jsonResponse.getAsJsonArray("data");
        }
    }
    
    // ======================= TEST =============
    /**
     * Teste la connexion
     * @return 
     */
    public static boolean testConnexion() {
        try {
            Request request = new Request.Builder()
                    .url("http://localhost:3000/")
                    .get()
                    .build();
            try (Response response = client.newCall(request).execute()) {
                return response.isSuccessful();
            }
        } catch (IOException e) {
            return false;
        }
    }
}
