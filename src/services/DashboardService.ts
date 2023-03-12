import AddressRepository from "../repository/AddressRepository"
import DentistRepository from "../repository/DentistRepository"
import PatientRepository from "../repository/PatientRepository"
import SecretaryRepository from "../repository/SecretaryRepository"
import UserRepository from "../repository/UserRepository"

interface CountResponse {
  totalPatients: number
  totalDentists: number
  totalSecretaries: number
  totalUsers: number
}

export default class AddressService {
  private patientRepository: PatientRepository
  private dentistRepository: DentistRepository
  private secretaryRepository: SecretaryRepository
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
    this.patientRepository = new PatientRepository()
    this.dentistRepository = new DentistRepository()
    this.secretaryRepository = new SecretaryRepository()
  }

  async count(): Promise<CountResponse> {
    try {
      const totalPatients = await this.patientRepository.count()
      const totalDentists = await this.dentistRepository.count()
      const totalSecretaries = await this.secretaryRepository.count()
      const totalUsers = await this.userRepository.count()

      return {
        totalPatients: totalPatients,
        totalDentists: totalDentists,
        totalSecretaries: totalSecretaries,
        totalUsers: totalUsers,
      }
    } catch (e: any) {
      throw new Error(e)
    }
  }
}
