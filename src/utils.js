export function filterJobs(allJobs, name, team, checkCar) {
  const newData = allJobs.filter((job) => {
    const jobData = `${job.name.toUpperCase()} ${job.realName.toUpperCase()}`;
    const textData = name.toUpperCase();
    if (checkCar === false) {
      if (team === 'all') return jobData.indexOf(textData) > -1;

      return (
        jobData.indexOf(textData) > -1 &&
        job.team.name.toUpperCase() === team.toUpperCase()
      );
    }
    if (team === 'all')
      return jobData.indexOf(textData) > -1 && job.hasCar === 1;

    return (
      jobData.indexOf(textData) > -1 &&
      job.team.name.toUpperCase() === team.toUpperCase() &&
      job.hasCar === 1
    );
  });

  return newData;
}
