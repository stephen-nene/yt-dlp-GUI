use std::process::Command;

// This function checks if the program is available and returns true if it is, false otherwise
#[tauri::command]
fn is_program_available(program: &str) -> bool {
    let output = Command::new(program)
        .arg("--version")
        .output(); // Run the command and capture output

    match output {
        Ok(output) => output.status.success(), // Return true if the command executed successfully
        Err(_) => false, // Return false if there was an error (program not found)
    }
}

// Main entry point for Tauri application
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init()) // Initialize the shell plugin for command execution
        .invoke_handler(tauri::generate_handler![is_program_available]) // Register the command handler
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
