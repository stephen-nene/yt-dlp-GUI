use std::process::Command;
use std::str;
use tauri::command;

// Command to fetch video formats using yt-dlp and return JSON output
#[command]
fn get_video_formats(url: String) -> Result<String, String> {
    let output = Command::new("yt-dlp")
        .arg("-j")
        .arg("--skip-download") // Ensure no downloading happens
        .arg(url)
        .output();

    match output {
        Ok(output) => {
            if output.status.success() {
                let json_output = str::from_utf8(&output.stdout)
                    .unwrap_or("")
                    .to_string();
                Ok(json_output)
            } else {
                let error_message = str::from_utf8(&output.stderr)
                    .unwrap_or("Unknown error occurred")
                    .to_string();
                Err(format!("yt-dlp error: {}", error_message))
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
