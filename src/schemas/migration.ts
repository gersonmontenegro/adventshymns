export const migration = (oldRealm, newRealm) => {
  const oldVerses = oldRealm.objects('Verse');
  const newVerses = newRealm.objects('Verse');

  for (let i = 0; i < oldVerses.length; i++) {
    newVerses[i].searchableContent = oldVerses[i].content
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
};
