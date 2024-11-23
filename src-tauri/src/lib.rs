use std::process::Command;
use std::str;
use tauri::command;

// Command to fetch video formats using yt-dlp
#[command]
fn get_video_formats(url: String) -> Result<Vec<String>, String> {
    // Run the yt-dlp command
    let output = Command::new("yt-dlp")
        .arg("-F") // The -F flag lists all available formats
        .arg(url)
        .output();

    match output {
        Ok(output) => {
            if output.status.success() {
                // Convert the output to a string
                let formats = str::from_utf8(&output.stdout)
                    .unwrap_or("")
                    .lines()
                    .skip(1) // Skip header
                    .map(|line| line.to_string()) // Collect formats
                    .collect::<Vec<String>>();

                // Return the list of formats
                Ok(formats)
            } else {
                Err("Error running yt-dlp".to_string())
            }
        }
        Err(err) => Err(format!("Failed to execute yt-dlp: {}", err)),
    }
}

#[tauri::command]
fn is_program_available(program: &str) -> bool {
    let output = Command::new(program).arg("--version").output();

    match output {
        Ok(output) => output.status.success(),
        Err(_) => false,
    }
}

// Main entry point for Tauri application
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_video_formats,
            is_program_available
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
