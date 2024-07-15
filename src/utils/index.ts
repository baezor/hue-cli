export async function getDeviceList(ip: string, clientKey: string): Promise<void> {
  /**
   * Create a request to the Hue bridge to get a list of devices
   * URL:	http://<bridge ip address>/clip/v2/resource/device
   * Method	GET
   * Header	hue-application-key: <appkey>
   */

  try {
    const req = await fetch(`http://${ip}/clip/v2/resource/device`, {
      headers: {
        'hue-application-key': clientKey,
      },
      method: 'GET',
    })

    const response = await req.json()
    console.log('Device List:', response)
  } catch (error) {
    console.error('Error getting device list:', error)
  }
}
