package ini.system;


import android.app.Activity;
import org.apache.cordova.DroidGap;


import android.os.Bundle;

public class INI_FroyoActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}