import Step from '../../wizard/Step';

export default function RepairInstructions() {
  window.parent.postMessage({ type: 'ZIPPER_WIZARD_STEP', payload: 3 }, '*');
  return (
    <Step>
      <div className="space-y-4">
        <p>Take a top stop from our outdoor kit and crimp the top like this:</p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZaN3DMgHm01-6C8oAIuJyc1U2k5DM9Qb1g&s"
          alt="Crimping instructions"
          className="mx-auto"
        />
        <p>
          Click{' '}
          <a href="https://www.example.com" className="text-primary hover:underline">
            HERE
          </a>{' '}
          to add a top stop to your cart.
        </p>
      </div>
    </Step>
  );
}
