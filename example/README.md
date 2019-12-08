# Livecode

## 1. How to build a screen ?

- Open `PlayerCanal`
- Add:

```diff
...
      <Screen
        visible={
          PlayerModule.isMoviePlaying
+         && !ConnectivityModule.isConnectedToChromeCast
        }
        name="OnScreenPlayer"
...
+      <Screen
+        Component={RemoteControlScreen}
+        name="RemoteControl"
+        visible={
+          PlayerModule.isMoviePlaying &&
+          ConnectivityModule.isConnectedToChromeCast
+        }
+        Transitioner={transition.Fade}
+      />
```

## 2. How to perform a reaction ?

- Open `HomeModule`
- Add:

```diff
+  automaticallyFilterDownloadOnOffline = autorun(() => {
+    if (!ConnectivityModule.isConnected) {
+      this.filterDownloaded();
+    }
+  });
```

## 3. How cool are transitioner ?

Try out by modifying a `transitionner` props. Set it to `transition.RotateCrazy`
