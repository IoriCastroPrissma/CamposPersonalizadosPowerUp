/* eslint-disable @typescript-eslint/no-explicit-any */

// Interface para o objeto 't' injetado pela biblioteca do Trello
export interface TrelloInstance {
  // Retorna uma Promise que resolve com os dados armazenados
  get(scope: 'card' | 'board' | 'member' | 'organization' | string, visibility: 'shared' | 'private', key?: string, defaultValue?: any): Promise<any>;
  
  // Salva os dados no escopo e visibilidade especificados
  set(scope: 'card' | 'board' | 'member' | 'organization', visibility: 'shared' | 'private', key: string, value: any): Promise<void>;
  set(scope: 'card' | 'board' | 'member' | 'organization', visibility: 'shared' | 'private', values: { [key: string]: any }): Promise<void>;
  
  // Abre um popup do Trello
  popup(options: {
    title: string;
    url: string;
    args?: any;
    height?: number;
  }): void;
  
  // Abre um modal do Trello
  modal(options: {
    title: string;
    url: string;
    args?: any;
    accentColor?: string;
    height?: number;
    fullscreen?: boolean;
    actions?: Array<{
      icon: string;
      alt: string;
      position: 'left' | 'right';
      callback: (t: TrelloInstance) => void;
    }>;
  }): void;
  
  // Redimensiona o iframe atual para ajustar-se ao conteúdo
  sizeTo(selectorOrElement: string | HTMLElement): void;
  
  // Retorna informações de contexto sobre o quadro, cartão ou membro atual
  getContext(): {
    board: string;
    card?: string;
    command?: string;
    member: string;
    organization?: string;
    permissions?: {
      board: 'read' | 'write';
      organization: 'read' | 'write';
      card: 'read' | 'write';
    };
  };

  // Fecha o popup atual
  closePopup(): void;
  
  // Fecha o modal atual
  closeModal(): void;
  
  // Retorna uma Promise que resolve com dados detalhados do cartão
  card(...fields: string[]): Promise<any>;
  
  // Retorna uma Promise que resolve com dados detalhados do quadro
  board(...fields: string[]): Promise<any>;
  
  // Assina uma URL para uso seguro em iframes do Trello
  signUrl(url: string, args?: any): string;
}

// Declarar a variável global window.TrelloPowerUp
declare global {
  interface Window {
    TrelloPowerUp: {
      initialize(
        capabilities: { [key: string]: (t: TrelloInstance, options?: any) => any },
        options?: {
          appKey?: string;
          appName?: string;
        }
      ): void;
      iframe(options?: {
        appKey?: string;
        appName?: string;
      }): TrelloInstance;
      Promise: typeof Promise;
    };
  }
}

// Hook ou helper para obter a instância do Trello no Iframe
export function getTrelloInstance(): TrelloInstance {
  if (typeof window !== 'undefined' && window.TrelloPowerUp) {
    return window.TrelloPowerUp.iframe();
  }
  // Retorno mockado para desenvolvimento fora do Trello
  return {
    get: async (_scope: string, _visibility: string, _key?: string, defaultValue?: any) => defaultValue,
    set: async () => {},
    popup: () => {},
    modal: () => {},
    sizeTo: () => {},
    getContext: () => ({ board: 'mock-board', card: 'mock-card', member: 'mock-member' }),
    closePopup: () => {},
    closeModal: () => {},
    card: async () => ({ id: 'mock-card', name: 'Mock Card' }),
    board: async () => ({ id: 'mock-board', name: 'Mock Board' }),
    signUrl: (url: string) => url,
  } as unknown as TrelloInstance;
}
