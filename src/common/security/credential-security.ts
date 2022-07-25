import argon from 'argon2'
import { CredentialEncryption } from '@core/application/ports/security/credential-encryption'

export class CredentialSecurity implements CredentialEncryption {
  async hash (password: string): Promise<string> {
    const passwordHash = await argon.hash(password)
    return passwordHash
  }

  async compare (password: string, hash: string): Promise<boolean> {
    const valid = await argon.verify(hash, password)
    return valid
  }
}
