import creator from './creator';

export async function create(projectName, options) {
  // const creator = new Creator()
  await creator.create(options);
}
