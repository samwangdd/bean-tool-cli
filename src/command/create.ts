import creator from './creator';

export default async function create(projectName, options) {
  // const creator = new Creator()
  await creator.create(options)
}