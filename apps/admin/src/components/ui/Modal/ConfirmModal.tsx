import Modal from './Modal';
import * as React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import RenderIf from '../RenderIf';
import Spinner from '../Spinner';
import classNames from 'classnames';

interface IConfirmModalProps {
	titleModal?: React.ReactNode;
	title?: React.ReactNode;
	subTitle?: React.ReactNode;
	showModal?: boolean;
	onClose?: () => void;
	buttonCancelText?: React.ReactNode;
	buttonAccepText?: React.ReactNode;
	onClickButtonAccept: () => void;
	isLoading?: boolean;
}

const ConfirmModal: React.FunctionComponent<IConfirmModalProps> = props => {
	const {
		title,
		titleModal,
		subTitle,
		onClose,
		showModal,
		buttonCancelText,
		buttonAccepText,
		onClickButtonAccept,
		isLoading,
	} = props;

	return (
		<Modal title={titleModal} onClose={onClose} size={'md'} showModal={showModal}>
			<div className="lg:px-14">
				<h6 className="text-center text-xl mb-1">{title}</h6>
				<p className="text-center text-xs">{subTitle}</p>

				<div className="mt-4 flex items-center justify-center space-x-2">
					<button className="btn btn-danger btn-xs" onClick={onClose}>
						{buttonCancelText} <FaTimes className="ml-1.5" />
					</button>

					<button
						disabled={isLoading}
						className={classNames(
							'btn btn-success btn-xs',
							isLoading && 'px-10'
						)}
						onClick={onClickButtonAccept}
					>
						<RenderIf isTrue={!isLoading}>
							{buttonAccepText}{' '}
							<FaCheck className="ml-1.5" />
						</RenderIf>
						<RenderIf isTrue={isLoading}>
							<Spinner />
						</RenderIf>
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
