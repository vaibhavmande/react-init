export const requestPayload: Record<string, unknown> = {
  header: {
    recordCode: 'string',
    boardNumber: 'string',
    employmentMonth: 'string',
  },
  employer: {
    recordCode: 'string',
    employerName: 'string',
    boardNumber: 'string',
    streetAddress: 'string',
    city: 'string',
    province: 'string',
    postalCode: 'string',
    mailingStreetAddress: 'string',
    mailingCity: 'string',
    mailingProvince: 'string',
    mailingPostalCode: 'string',
    phoneNumber: 'string',
    faxNumber: 'string',
    contactName: 'string',
    contactPhone: 'string',
    employmentMonth: 'string',
    totalEmployerContributions: 'string',
    employerPayoutType: 'string',
    pensionPlan: 'string',
    defaultAtaLocalNumber: 'string',
  },
  employees: [
    {
      employeeUiKey: 'string',
      recordCode: 'string',
      boardNumber: 'string',
      lastName: 'string',
      firstName: 'string',
      sin: 'string',
      schoolCode: 'string',
      dateOfBirth: 'string',
      streetAddress: 'string',
      city: 'string',
      province: 'string',
      postalCode: 'string',
      teachingCertificateNumber: 'string',
      phoneNumber: 'string',
      totalOperationalDaysYear: 'string',
      employerEmployeeNumber: 'string',
      totalOperationalDaysMonth: 'string',
      payrollSystemUpdateComment: 'string',
      workPhone: 'string',
      ataLocal: 'string',
      priorStatusFulltime: 'string',
      terminationStatus: 'string',
      terminationDate: 'string',
      contributions: [
        {
          contributionUiKey: 'string',
          recordCode: 'string',
          boardNumber: 'string',
          sin: 'string',
          fteDaysPaid: 'string',
          fte: 'string',
          ftMonthlyRateOfSalaryFtMrs: 'string',
          ptMonthlyRateOfSalaryPtMrs: 'string',
          pensionableSalaryPaid: 'string',
          contributionsEmployee: 'string',
          specialCode: 'string',
          statusCode: 'string',
          recordType: 'string',
          effectiveDateOfRecord: 'string',
          totalOperationDaysYear: 'string',
          totalOperationalDaysMonth: 'string',
          potentialRecordLdentification: 'string',
          ataFees: 'string',
          startOfSchoolYear: 'string',
          fteDaysMissed: 'string',
          grossPay: 'string',
          contributionPayoutType: 'string',
          allowanceAmount: 'string',
          allowancePayoutType: 'string',
          signingBonusAmount: 'string',
          multipleContractId: 'string',
        },
      ],
    },
  ],
  footer: {
    recordCode: 'string',
    boardNumber: 'string',
    employment: 'string',
    totalEmployerRecords: 'string',
    totalEmployeeRecords: 'string',
    totalContributionRecords: 'string',
    totalContributions: 'string',
  },
};
