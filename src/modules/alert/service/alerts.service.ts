import { Injectable } from '@nestjs/common';
import { AlertsRepository } from '../repository/alerts.repository'; // Lembre-se de ajustar o caminho correto
import { AlertEntity } from '../../../database/entities/alert.entity'; // Lembre-se de ajustar o caminho correto

@Injectable()
export class AlertsService {
  constructor(private readonly alertsRepository: AlertsRepository) {}

  async findEmailUser(alertId: string): Promise<string | null> {
    const alerts = await this.alertsRepository.findUserById(alertId);
    if (alerts && alerts.length > 0) {
      const alert = alerts[0]; 
      if (alert.user) {
        return alert.user.email;
      }
    }
    return null;
  }
}
