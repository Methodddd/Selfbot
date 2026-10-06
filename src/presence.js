'use strict';

const descriptions = [
  '🕸️ lost in the static',
  '🦇 born for the afterhours',
  '🖤 silence hits different',
  '💀 dead calm, still standing',
];

module.exports = function startPresence(client, RichPresence) {
  const activity = new RichPresence(client)
    .setName('Methodddd selfbot')
    .setType('PLAYING')
    .setApplicationId('1557023060672905246')
    .setAssetsLargeImage('1557023151479595048')
    .setAssetsLargeText('Methodddd selfbot')
    .setStartTimestamp(Date.now());

  let index = 0;
  let stopped = false;

  const update = () => {
    if (stopped || !client.isReady()) return;

    try {
      activity.setDetails(descriptions[index]);
      client.user.setPresence({ activities: [activity] });
    } catch {
      console.error('Failed to update Rich Presence.');
    }
  };

  update();

  const timer = setInterval(() => {
    index = (index + 1) % descriptions.length;
    update();
  }, 15_000);

  return () => {
    stopped = true;
    clearInterval(timer);
  };
};
