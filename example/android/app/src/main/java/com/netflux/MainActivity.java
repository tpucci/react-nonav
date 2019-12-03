package com.netflux;

import com.facebook.react.GoogleCastActivity;

public class MainActivity extends GoogleCastActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Netflux";
  }

  @Override
  public int checkPermission(String permission, int pid, int uid) {
    return 0;
  }

  @Override
  public int checkSelfPermission(String permission) {
    return 0;
  }

  @Override
  public boolean shouldShowRequestPermissionRationale(String permission) {
    return false;
  }
}
