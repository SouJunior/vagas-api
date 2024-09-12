import { Injectable } from '@nestjs/common';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { HttpService } from '@nestjs/axios';
import { MailerService } from '@nestjs-modules/mailer';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AlertasService {
  constructor(
    private readonly httpService: HttpService,
    private readonly mailerService: MailerService,
  ) {}
  
  private alertas = [];

  create(createAlertaDto: CreateAlertaDto) {
    const novoAlerta = { id: Date.now(), ...createAlertaDto };
    this.alertas.push(novoAlerta);
    return novoAlerta;
  }

  async enviarEmailsDiarios() {
    for (const alerta of this.alertas) {
      const vagas = await this.buscarVagas(alerta.palavraChave, alerta.localizacao);
      const email = this.buscarEmailUsuario(alerta.usuarioId);
      await this.enviarEmail(email, vagas);
    }
  }

  private async buscarVagas(palavraChave: string, localizacao: string) {
    const response = await lastValueFrom(
      this.httpService.get(`/jobs`, {
        params: { palavraChave, localizacao },
      }),
    );
    return response.data;
  }

  private buscarEmailUsuario(usuarioId: number) {
    // Simulação de busca de e-mail do usuário
    return 'usuario@example.com';
  }

  private async enviarEmail(email: string, vagas: any[]) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Vagas Relevantes para Você',
      template: './vagas', // O template deve estar configurado
      context: { vagas },
    });
  }

}