import { EnvKey } from '@common/constant';
import { TimeHelper } from '@common/helper';
import { ConfigEnvironmentService } from '@src/configs';

export const CommunicationConstant = {
  get BaseAsset() {
    const config = ConfigEnvironmentService.getIns();
    return {
      primaryColor: config.get(EnvKey.App.PrimaryColor),
      companyName: config.get(EnvKey.App.CompanyName),
      logoUrl: config.get(EnvKey.App.LogoUrl),
      appUrl: config.get(EnvKey.App.BaseUri),
      currentYear: TimeHelper.nowUtc().getFullYear(),
    };
  },
};
