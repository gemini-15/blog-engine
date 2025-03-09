#[cfg(fuzzing)]
pub fn fuzz_md_article(data: &[u8]) {
    if let Ok(s) = std::str::from_utf8(data) {
        let temp_dir = tempfile::TempDir::new().unwrap();
        let file_path = temp_dir.path().join("fuzz.md");
        
        if std::fs::write(&file_path, s).is_ok() {
            let _ = MdArticle::init(file_path.to_string_lossy().into_owned());
        }
    }
} 