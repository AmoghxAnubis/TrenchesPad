import React from 'react';

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
    currentStep,
    totalSteps,
    steps,
}) => {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center">
                                {/* Step Circle */}
                                <div
                                    className={`w-16 h-16 border-brutal shadow-brutal flex items-center justify-center font-black text-2xl transition-all duration-300 ${isActive ? 'scale-110' : ''
                                        }`}
                                    style={{
                                        backgroundColor: isCompleted
                                            ? 'var(--accent-lime)'
                                            : isActive
                                                ? 'var(--accent-yellow)'
                                                : 'var(--bg-secondary)',
                                    }}
                                >
                                    {isCompleted ? '✓' : stepNumber}
                                </div>

                                {/* Step Label */}
                                <div className={`mt-2 text-xs font-black uppercase ${isActive ? 'text-[var(--accent-yellow)]' : ''
                                    }`}>
                                    {step}
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-1 bg-[var(--border)] max-w-[100px]"></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
