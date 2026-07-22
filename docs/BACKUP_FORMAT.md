# Backup Data Format

DataPath exports learner data as JSON for portable backup and restore.

## Structure

```json
{
  "version": 1,
  "exportedAt": "2026-07-22T15:30:00.000Z",
  "app": "DataPath",
  "data": {
    "progress": [],
    "bookmarks": [],
    "notes": [],
    "quizAttempts": [],
    "practiceResults": [],
    "savedQueries": [],
    "savedCode": [],
    "projectProgress": [],
    "activity": [],
    "preferences": []
  }
}
```

## Version

Current `version` is **1**. Import rejects unsupported versions.

## Validation on Import

1. File must parse as JSON
2. `app` must equal `"DataPath"`
3. `version` must match supported version
4. `data` must be an object
5. Each store contains an array of records with `id` fields

## Overwrite Behavior

- If existing progress is found, user must confirm overwrite
- Merge mode reserved for future cloud sync (`merge: true` in storage layer)

## Security

- Do not share backup files — they contain personal notes and progress
- Import validates structure; malformed files are rejected

## Future Cloud Sync

The same JSON structure will be used as the sync payload format when a cloud backend is added. See [ARCHITECTURE.md](ARCHITECTURE.md).
