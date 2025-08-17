package com.mastercoding.journalapp;

import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContract;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.firebase.Timestamp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.Date;

public class AddJournalActivity extends AppCompatActivity {

    // Widgets
    private Button saveButton;
    private ImageView addPhotoBtn;
    private ProgressBar progressBar;
    private EditText titleEditText;
    private EditText thoughtsEditText;
    private ImageView imageView;


    // Firebase (FireStore)
    private FirebaseFirestore db = FirebaseFirestore.getInstance();
    private CollectionReference collectionReference =
            db.collection("Journal");


    // Firebase Auth : UserId and UserName
    private String currentUserId;
    private String currentUserName;
    private FirebaseAuth firebaseAuth;
    private FirebaseAuth.AuthStateListener authStateListener;
    private FirebaseUser user;

    // Cloudinary Helper
    private CloudinaryHelper cloudinaryHelper;

    // Using Activity Result Launcher
    ActivityResultLauncher<String> mTakePhoto;
    Uri imageUri;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_journal);

        progressBar = findViewById(R.id.post_progressBar);
        titleEditText = findViewById(R.id.post_title_et);
        thoughtsEditText = findViewById(R.id.post_description_et);
        imageView = findViewById(R.id.post_imageView);
        saveButton = findViewById(R.id.post_save_journal_button);
        addPhotoBtn = findViewById(R.id.postCameraButton);


        progressBar.setVisibility(View.INVISIBLE);

        // Initialize Cloudinary Helper
        cloudinaryHelper = new CloudinaryHelper();

        // Auth
        firebaseAuth = FirebaseAuth.getInstance();

        // Getting the Current User
        if (user != null){
            currentUserId = user.getUid();
            currentUserName = user.getDisplayName();
        } else {
            // User not logged in, redirect to login
            Intent i = new Intent(AddJournalActivity.this, MainActivity.class);
            startActivity(i);
            finish();
        }

        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SaveJournal();
            }
        });


        mTakePhoto = registerForActivityResult(
                new ActivityResultContracts.GetContent(),
                new ActivityResultCallback<Uri>() {
                    @Override
                    public void onActivityResult(Uri result) {
                        // Get the image URI
                        imageUri = result;
                        
                        // Show preview using Glide for better performance
                        if (result != null) {
                            GlideConfig.loadImage(AddJournalActivity.this, result, imageView);
                        }
                    }
                }
        );




        addPhotoBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Getting Image From The Gallery
                mTakePhoto.launch("image/*");
            }
        });




    }

    private void SaveJournal() {

        String title = titleEditText.getText().toString().trim();
        String thoughts = thoughtsEditText.getText().toString().trim();

        progressBar.setVisibility(View.VISIBLE);

        if (!TextUtils.isEmpty(title) && !TextUtils.isEmpty(thoughts)
            && imageUri !=null){

            // Upload image to Cloudinary
            cloudinaryHelper.uploadImage(this, imageUri, new CloudinaryHelper.UploadCallback() {
                @Override
                public void onSuccess(String imageUrl) {
                    // Creating a Journal Object with Cloudinary image URL
                    Journal journal = new Journal();
                    journal.setTitle(title);
                    journal.setThoughts(thoughts);
                    journal.setImageUrl(imageUrl); // This will be the Cloudinary URL

                    journal.setTimeAdded(new Timestamp(new Date()));
                    journal.setUserName(currentUserName);
                    journal.setUserId(currentUserId);

                    // Save to Firebase Firestore (only the data, not the image)
                    collectionReference.add(journal)
                            .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                                @Override
                                public void onSuccess(DocumentReference documentReference) {
                                    progressBar.setVisibility(View.INVISIBLE);
                                    Toast.makeText(AddJournalActivity.this, 
                                            "Journal saved successfully!", Toast.LENGTH_SHORT).show();

                                    Intent i = new Intent(AddJournalActivity.this, JournalListActivity.class);
                                    startActivity(i);
                                    finish();
                                }
                            }).addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    progressBar.setVisibility(View.INVISIBLE);
                                    Toast.makeText(AddJournalActivity.this,
                                            "Failed to save journal: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                                }
                            });
                }

                @Override
                public void onError(String error) {
                    progressBar.setVisibility(View.INVISIBLE);
                    Toast.makeText(AddJournalActivity.this,
                            "Failed to upload image: " + error, Toast.LENGTH_SHORT).show();
                }
            });

        } else {
            progressBar.setVisibility(View.INVISIBLE);
            Toast.makeText(this, "Please fill all fields and select an image", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
        user = firebaseAuth.getCurrentUser();
    }


}



