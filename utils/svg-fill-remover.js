// utils/svg-fill-remover.js
// Script to remove hardcoded fill attributes from all SVG files

const fs = require("fs");
const path = require("path");

// Configuration - paths relative to project root
const SVG_DIRECTORY = "../assets/icons"; // Adjust based on your structure
const BACKUP_DIRECTORY = "../assets/icons-backup";

// Or if running from project root:
// const SVG_DIRECTORY = './assets/icons';
// const BACKUP_DIRECTORY = './assets/icons-backup';

// Create backup directory if it doesn't exist
function ensureBackupDirectory() {
	const backupPath = path.resolve(__dirname, BACKUP_DIRECTORY);
	if (!fs.existsSync(backupPath)) {
		fs.mkdirSync(backupPath, { recursive: true });
		console.log(`✅ Created backup directory: ${backupPath}`);
	}
	return backupPath;
}

function removeFillAttributes(svgContent) {
	let processed = svgContent;

	// Remove fill attributes with any value (including #colors, currentColor, etc.)
	processed = processed.replace(/\s+fill="[^"]*"/g, "");
	processed = processed.replace(/\s+fill='[^']*'/g, "");

	// Remove fill from style attributes
	processed = processed.replace(/fill:\s*[^;"]*/g, "");

	// Clean up empty style attributes
	processed = processed.replace(/\s+style=""/g, "");
	processed = processed.replace(/\s+style=''/g, "");

	// Clean up double spaces and normalize whitespace
	processed = processed.replace(/\s+/g, " ");
	processed = processed.trim();

	return processed;
}

function processDirectory(directory, backupDir) {
	const svgDir = path.resolve(__dirname, directory);

	if (!fs.existsSync(svgDir)) {
		console.error(`❌ Directory not found: ${svgDir}`);
		return 0;
	}

	const files = fs.readdirSync(svgDir);
	let processedCount = 0;

	files.forEach((file) => {
		const filePath = path.join(svgDir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			// Recursively process subdirectories
			const subBackupDir = path.join(backupDir, file);
			if (!fs.existsSync(subBackupDir)) {
				fs.mkdirSync(subBackupDir, { recursive: true });
			}
			processedCount += processDirectory(
				path.join(directory, file),
				subBackupDir
			);
		} else if (path.extname(file).toLowerCase() === ".svg") {
			try {
				// Read original SVG
				const originalContent = fs.readFileSync(filePath, "utf8");

				// Create backup
				const backupPath = path.join(backupDir, file);
				fs.writeFileSync(backupPath, originalContent);

				// Process SVG to remove fills
				const processedContent = removeFillAttributes(originalContent);

				// Only write if content actually changed
				if (originalContent !== processedContent) {
					fs.writeFileSync(filePath, processedContent);
					console.log(`✅ Processed: ${file} (removed fill attributes)`);
				} else {
					console.log(`⚪ Skipped: ${file} (no fill attributes found)`);
				}

				processedCount++;
			} catch (error) {
				console.error(`❌ Error processing ${file}:`, error.message);
			}
		}
	});

	return processedCount;
}

// Test function for single file
function testSingleFile(relativePath) {
	const filePath = path.resolve(__dirname, relativePath);
	console.log("🧪 Testing with single file:", filePath);

	if (!fs.existsSync(filePath)) {
		console.error("❌ File not found:", filePath);
		return;
	}

	const originalContent = fs.readFileSync(filePath, "utf8");
	console.log("\n📄 Original content:");
	console.log(
		originalContent.substring(0, 300) +
			(originalContent.length > 300 ? "..." : "")
	);

	const processedContent = removeFillAttributes(originalContent);
	console.log("\n🔄 Processed content:");
	console.log(
		processedContent.substring(0, 300) +
			(processedContent.length > 300 ? "..." : "")
	);

	// Write to test file
	const testPath = filePath.replace(".svg", "-test-processed.svg");
	fs.writeFileSync(testPath, processedContent);
	console.log("\n✅ Test file created:", testPath);

	// Show what changed
	if (originalContent !== processedContent) {
		console.log("\n🎯 Changes detected - fill attributes were removed");
	} else {
		console.log("\n⚪ No changes needed - no fill attributes found");
	}
}

// Main execution function
function run() {
	console.log("🚀 SVG Fill Attribute Remover");
	console.log("================================");
	console.log(
		`📁 Processing directory: ${path.resolve(__dirname, SVG_DIRECTORY)}`
	);

	const backupDir = ensureBackupDirectory();
	console.log(`💾 Backup directory: ${backupDir}`);
	console.log("");

	const totalProcessed = processDirectory(SVG_DIRECTORY, backupDir);

	console.log("");
	console.log("🎉 Process Complete!");
	console.log(`📊 Total SVGs processed: ${totalProcessed}`);
	console.log(`💾 Backups saved to: ${backupDir}`);
	console.log("");
	console.log("ℹ️  Your SVGs will now inherit colors from parent components!");
	console.log(
		"ℹ️  To restore originals, copy files from the backup directory."
	);
}

// Export functions for potential reuse
module.exports = {
	removeFillAttributes,
	processDirectory,
	testSingleFile,
	run,
};

// If called directly (not imported), run the script
if (require.main === module) {
	// Uncomment one of these options:

	// Option 1: Test with a single file first (recommended)
	// testSingleFile('../assets/icons/plus-circle.svg');

	// Option 2: Process all SVGs
	run();
}
