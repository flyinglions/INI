package flying.lions;

import org.apache.cordova.DroidGap;


import android.os.Bundle;


public class UserSettingsActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
       // setContentView(R.layout.main);
	//super.loadUrl("file:///android_asset/www/get_sms_id.html");
	//super.loadUrl("file:///android_asset/www/write_decoded_data_to_file.html");
        super.loadUrl("file:///android_asset/www/index.html");
	
    }
}