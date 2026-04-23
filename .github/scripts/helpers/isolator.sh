#!/usr/bin/env bash

BACKPRESSURE_BACKUP_FOLDER=".maestro.backpressure"
BACKPRESSURE_FOLDER="tests"

# Moves all tests to a backup folder to avoid agents reading them before they are needed
isolate_backpressure() {
    if [[ -d "$BACKPRESSURE_BACKUP_FOLDER" ]]; then
        log ERROR "There is already backpressure isolated. Aborting."
        exit 1
    fi

    if [[ ! -d "$BACKPRESSURE_FOLDER" ]]; then
        log WARN "There is no backpressure to isolate. Skipping isolation..."
        return 0
    fi

    # Move "tests/" to ".maestro.backpressure/tests/"
    mkdir -p "$BACKPRESSURE_BACKUP_FOLDER"
    mv -f "$BACKPRESSURE_FOLDER" "$BACKPRESSURE_BACKUP_FOLDER/$BACKPRESSURE_FOLDER"
}

# Restore backpressure to its original location so that the agents can read them
# If called with no arguments, restore all backpressure
# If called with a single argument, restore backpressure for that command
restore_backpressure() {
    if [ -z "$1" ]; then
        log INFO "Restoring all backpressure..."

        if [[ ! -d "$BACKPRESSURE_BACKUP_FOLDER" ]]; then
            log WARN "There is no remaining backpressure to restore. Skipping restoration..."
            return 0
        fi

        mkdir -p "$BACKPRESSURE_FOLDER"
        rsync -av --ignore-existing "$BACKPRESSURE_BACKUP_FOLDER/$BACKPRESSURE_FOLDER"/ "$BACKPRESSURE_FOLDER"/
        rm -rf "$BACKPRESSURE_BACKUP_FOLDER"
    else
        log INFO "Restoring backpressure for $1..."
        local file_path="${1##* }"

        if [[ ! "$file_path" == *.* ]]; then
            log INFO "No file path found in $1. Skipping restoration..."
            return 0
        fi

        # Verify that the file path is not already moved
        if [[ -f "$file_path" ]]; then
            log INFO "The file $file_path has already been moved. Skipping restoration..."
            return 0
        fi

        # Verify that the given file exists in the backpressure backup folder
        if [[ ! -f "$BACKPRESSURE_BACKUP_FOLDER/$file_path" ]]; then
            log WARN "The test file $file_path does not exist in $BACKPRESSURE_BACKUP_FOLDER. Skipping restoration..."
            return 0
        fi

        # Move back the targeted backpressure into its expected location
        mkdir -p "$(dirname "$file_path")"
        mv -f "$BACKPRESSURE_BACKUP_FOLDER/$file_path" "$file_path"
    fi
    
    log INFO "Restored backpressure!"
}
