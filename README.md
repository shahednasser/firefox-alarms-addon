# Firefox Add-on Tutorial

Repository for Firefox Add-on Tutorial for SitePoint. You can find the Add-on [here](https://addons.mozilla.org/en-US/firefox/addon/personalized-alarms/)

## Installing Add-On as Temporary Add-On

When adding the Add-On as a Temporary Add-On, make sure to include the following in `manifest.json`:

```json
"browser_specific_settings": {
    "gecko": {
        "id": "addon@example.com",
        "strict_min_version": "42.0"
    }
}
```

Make sure to remove it once you're ready to publish the package.
