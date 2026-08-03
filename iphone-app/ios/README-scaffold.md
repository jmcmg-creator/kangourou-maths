# Dossier `ios/`

Ce dossier est **vide au commit initial** parce que sa génération nécessite macOS + Xcode + CocoaPods (indisponibles dans l'environnement de dev headless où ce projet a été scaffoldé).

## Étape à faire sur macOS (une seule fois)

```bash
cd iphone-app
npm install
npm run build
npx cap add ios
```

Cette commande crée :

```
ios/
└── App/
    ├── App.xcodeproj/
    ├── App.xcworkspace/
    ├── App/
    │   ├── AppDelegate.swift
    │   ├── Info.plist
    │   ├── Assets.xcassets/
    │   └── ...
    ├── Podfile
    └── ...
```

Committer le contenu généré (sauf les artefacts déjà listés dans `.gitignore` :
`Pods/`, `build/`, `xcuserdata/`, `Podfile.lock`).

## Après cap add ios : configurations à faire

Voir `docs/IOS_BUILD_AND_RELEASE.md` pour :

- Descriptions de permissions (`NSMicrophoneUsageDescription`, `NSSpeechRecognitionUsageDescription`)
- Bundle Identifier
- Signing / Team Apple Developer
- Icônes 1024×1024 + splash
- Deployment target iOS 15.0

## Pourquoi ce fichier

Pour éviter que `iphone-app/ios/` disparaisse au commit (Git ignore les dossiers vides) et pour rappeler la marche à suivre.
