'use client';

import React, { useState } from 'react';
import { Button, Input, StepIndicator } from '@/components/ui';

interface FormData {
    // Step 1: Token Info
    tokenName: string;
    tokenSymbol: string;
    initialSupply: string;

    // Step 2: Campaign Settings
    goalAmount: string;
    deadline: string;
    softCap: string;
}

export default function CreateCampaignPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        tokenName: '',
        tokenSymbol: '',
        initialSupply: '',
        goalAmount: '',
        deadline: '',
        softCap: '',
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const steps = ['TOKEN', 'GOAL', 'REVIEW'];

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<FormData> = {};

        if (step === 1) {
            if (!formData.tokenName) newErrors.tokenName = 'Token name required';
            if (!formData.tokenSymbol) newErrors.tokenSymbol = 'Symbol required';
            if (!formData.initialSupply || parseFloat(formData.initialSupply) <= 0) {
                newErrors.initialSupply = 'Valid supply required';
            }
        }

        if (step === 2) {
            if (!formData.goalAmount || parseFloat(formData.goalAmount) <= 0) {
                newErrors.goalAmount = 'Valid goal required';
            }
            if (!formData.deadline) newErrors.deadline = 'Deadline required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 3));
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleLaunch = () => {
        if (validateStep(2)) {
            // TODO: Integrate with smart contract
            console.log('Launching campaign:', formData);
            alert('Campaign launch will be integrated with smart contract!');
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-16 bg-[var(--bg-primary)]">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="mb-12 text-center slide-in-up">
                    <div className="inline-block bg-[var(--accent-pink)] border-brutal shadow-brutal px-6 py-3 mb-6 rotate-brutal hover:rotate-0 transition-transform duration-300">
                        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-black text-white">
                            LAUNCH
                        </h1>
                    </div>
                    <p className="text-lg font-bold max-w-2xl mx-auto">
                        Create your campaign in 3 simple steps
                    </p>
                </div>

                {/* Step Indicator */}
                <StepIndicator currentStep={currentStep} totalSteps={3} steps={steps} />

                {/* Form Container */}
                <div className="bg-[var(--bg-secondary)] border-brutal-thick shadow-brutal-lg p-8 md:p-12">
                    {/* Step 1: Token Info */}
                    {currentStep === 1 && (
                        <div className="space-y-6 slide-in-up">
                            <div className="mb-8">
                                <h2 className="text-3xl font-black uppercase mb-2">
                                    <span className="bg-[var(--accent-yellow)] px-3">01</span> TOKEN INFO
                                </h2>
                                <p className="font-bold text-[var(--text-muted)]">
                                    Configure your ERC-20 token
                                </p>
                            </div>

                            <Input
                                label="Token Name"
                                placeholder="MY AWESOME TOKEN"
                                value={formData.tokenName}
                                onChange={(e) => handleInputChange('tokenName', e.target.value)}
                                error={errors.tokenName}
                            />

                            <Input
                                label="Token Symbol"
                                placeholder="MAT"
                                value={formData.tokenSymbol}
                                onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                                error={errors.tokenSymbol}
                                maxLength={10}
                            />

                            <Input
                                label="Initial Supply"
                                type="number"
                                placeholder="1000000"
                                value={formData.initialSupply}
                                onChange={(e) => handleInputChange('initialSupply', e.target.value)}
                                error={errors.initialSupply}
                                helperText="Total tokens to mint"
                            />
                        </div>
                    )}

                    {/* Step 2: Campaign Settings */}
                    {currentStep === 2 && (
                        <div className="space-y-6 slide-in-up">
                            <div className="mb-8">
                                <h2 className="text-3xl font-black uppercase mb-2">
                                    <span className="bg-[var(--accent-cyan)] px-3">02</span> CAMPAIGN GOAL
                                </h2>
                                <p className="font-bold text-[var(--text-muted)]">
                                    Set your funding target
                                </p>
                            </div>

                            <Input
                                label="Goal Amount (ETH)"
                                type="number"
                                step="0.01"
                                placeholder="10.0"
                                value={formData.goalAmount}
                                onChange={(e) => handleInputChange('goalAmount', e.target.value)}
                                error={errors.goalAmount}
                                helperText="Minimum ETH to raise"
                            />

                            <Input
                                label="Deadline"
                                type="datetime-local"
                                value={formData.deadline}
                                onChange={(e) => handleInputChange('deadline', e.target.value)}
                                error={errors.deadline}
                                helperText="Campaign end date"
                            />

                            <Input
                                label="Soft Cap (Optional)"
                                type="number"
                                step="0.01"
                                placeholder="5.0"
                                value={formData.softCap}
                                onChange={(e) => handleInputChange('softCap', e.target.value)}
                                helperText="Minimum viable funding"
                            />
                        </div>
                    )}

                    {/* Step 3: Review */}
                    {currentStep === 3 && (
                        <div className="space-y-6 slide-in-up">
                            <div className="mb-8">
                                <h2 className="text-3xl font-black uppercase mb-2">
                                    <span className="bg-[var(--accent-lime)] px-3">03</span> REVIEW
                                </h2>
                                <p className="font-bold text-[var(--text-muted)]">
                                    Confirm your campaign details
                                </p>
                            </div>

                            {/* Review Cards */}
                            <div className="space-y-4">
                                <div className="bg-[var(--bg-primary)] border-brutal shadow-brutal p-6">
                                    <h3 className="text-sm font-black uppercase text-[var(--text-muted)] mb-3">
                                        Token Details
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-bold">Name:</span>
                                            <span className="font-black">{formData.tokenName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-bold">Symbol:</span>
                                            <span className="font-black">${formData.tokenSymbol}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-bold">Supply:</span>
                                            <span className="font-black">{parseFloat(formData.initialSupply).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[var(--bg-primary)] border-brutal shadow-brutal p-6">
                                    <h3 className="text-sm font-black uppercase text-[var(--text-muted)] mb-3">
                                        Campaign Settings
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-bold">Goal:</span>
                                            <span className="font-black">{formData.goalAmount} ETH</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-bold">Deadline:</span>
                                            <span className="font-black">
                                                {new Date(formData.deadline).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {formData.softCap && (
                                            <div className="flex justify-between">
                                                <span className="font-bold">Soft Cap:</span>
                                                <span className="font-black">{formData.softCap} ETH</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Warning */}
                            <div className="bg-[var(--accent-yellow)] border-brutal shadow-brutal p-4">
                                <div className="flex gap-3">
                                    <div className="text-2xl">⚠️</div>
                                    <div>
                                        <div className="font-black uppercase text-sm mb-1">Important</div>
                                        <div className="font-bold text-sm">
                                            Campaign details cannot be changed after launch. Double-check everything!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-8 border-t-4 border-[var(--border)]">
                        <Button
                            variant="secondary"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={currentStep === 1 ? 'opacity-50' : ''}
                        >
                            ← BACK
                        </Button>

                        {currentStep < 3 ? (
                            <Button variant="primary" onClick={handleNext}>
                                NEXT →
                            </Button>
                        ) : (
                            <Button variant="accent" onClick={handleLaunch} className="pulse-brutal">
                                🚀 LAUNCH CAMPAIGN
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
