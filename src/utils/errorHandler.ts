// Error handling utilities for consistent error management across the application

export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

export class ErrorHandler {
  static handle(error: unknown, context: string): AppError {
    console.error(`Error in ${context}:`, error);

    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'UNKNOWN_ERROR',
        details: error
      };
    }

    if (typeof error === 'string') {
      return {
        message: error,
        code: 'STRING_ERROR'
      };
    }

    return {
      message: 'เกิดข้อผิดพลาดที่ไม่คาดคิด',
      code: 'UNKNOWN_ERROR',
      details: error
    };
  }

  static isAuthError(error: unknown): boolean {
    if (error instanceof Error) {
      return error.message.includes('Authentication') ||
             error.message.includes('Unauthorized') ||
             error.message.includes('401');
    }
    return false;
  }

  static isNetworkError(error: unknown): boolean {
    if (error instanceof Error) {
      return error.message.includes('Network') ||
             error.message.includes('fetch') ||
             error.name === 'NetworkError';
    }
    return false;
  }

  static getUserFriendlyMessage(error: AppError): string {
    // Map technical errors to user-friendly Thai messages
    const messageMap: Record<string, string> = {
      'Authentication expired': 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่',
      'Network error': 'ไม่สามารถเชื่อมต่อเครือข่ายได้',
      'Unauthorized': 'ไม่มีสิทธิ์เข้าถึง',
      'Not found': 'ไม่พบข้อมูลที่ต้องการ',
      'Server error': 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์',
      'Validation error': 'ข้อมูลไม่ถูกต้อง',
      'Timeout': 'การเชื่อมต่อใช้เวลานานเกินไป'
    };

    // Check for known error patterns
    for (const [pattern, message] of Object.entries(messageMap)) {
      if (error.message.includes(pattern)) {
        return message;
      }
    }

    // Return the original message if no mapping found
    return error.message;
  }
}

// Error boundary hook for functional components
export const useErrorHandler = () => {
  const handleError = (error: unknown, context: string) => {
    const appError = ErrorHandler.handle(error, context);
    const userMessage = ErrorHandler.getUserFriendlyMessage(appError);

    return {
      appError,
      userMessage,
      isAuthError: ErrorHandler.isAuthError(error),
      isNetworkError: ErrorHandler.isNetworkError(error)
    };
  };

  return { handleError };
};
