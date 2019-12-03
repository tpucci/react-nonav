package com.netflux;

import android.content.Context;

import com.google.android.gms.cast.framework.CastOptions;
import com.reactnative.googlecast.GoogleCastOptionsProvider;

public class CastOptionsProvider extends GoogleCastOptionsProvider {
    @Override
    public CastOptions getCastOptions(Context context) {
        CastOptions castOptions = new CastOptions.Builder()
                .setReceiverApplicationId("0E02B39C")
                .build();
        return castOptions;
    }
}