import Button from 'components/Button';
import React, { Dispatch, ReactElement, SyntheticEvent, useState } from 'react';

export type Settings = { maxScore: number; sounds: boolean };

type GameSettingsProps = {
  settings: Settings;
  setSettings: Dispatch<Settings>;
  setStage: Dispatch<0 | 1>;
  setScore: Dispatch<{ win: number; lose: number }>;
};

const GameSettings = ({
  settings,
  setSettings,
  setStage,
  setScore,
}: GameSettingsProps): ReactElement => {
  const [localSettings, setLocalSettings] = useState<Settings>({ ...settings });

  const handleSave = (e: SyntheticEvent): void => {
    e.preventDefault();
    setSettings(localSettings);
    setStage(0);
    setScore({ win: 0, lose: 0 });
  };

  return (
    <form className="flex flex-col gap-8 text-white" onSubmit={handleSave}>
      <h2 className="text-2xl underline">Settings</h2>
      <div>
        <label htmlFor="maxScore">
          Max Win/Loss:{' '}
          <input
            id="maxScore"
            className="rounded-lg px-2 text-gray-500"
            type="number"
            value={localSettings.maxScore}
            onChange={(e): void =>
              setLocalSettings((prev) => {
                return {
                  ...prev,
                  maxScore: Number(e.target.value),
                };
              })
            }
          />
        </label>
        <p className="mt-2 text-xs text-blue-300">Set Max Win/Loss to 0 for infinite games.</p>
      </div>
      <label htmlFor="sounds">
        Sounds:{' '}
        <input
          id="sounds"
          className="rounded-lg px-2 text-gray-500"
          type="checkbox"
          checked={localSettings.sounds}
          onChange={(e): void =>
            setLocalSettings((prev) => {
              return {
                ...prev,
                sounds: e.target.checked,
              };
            })
          }
        />
      </label>
      <Button text="Save Settings" type="submit" className="w-max" />
    </form>
  );
};

export default GameSettings;
